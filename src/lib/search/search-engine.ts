// Search engine using Fuse.js with custom scoring
import Fuse, { IFuseOptions, FuseResult } from 'fuse.js';
import { searchableContent } from './content-index';
import { SearchableContent, SearchResult, SearchFilters } from './types';

// Fuse.js configuration with weighted fields
const fuseOptions: IFuseOptions<SearchableContent> = {
  keys: [
    { name: 'title', weight: 0.35 },
    { name: 'description', weight: 0.25 },
    { name: 'keywords', weight: 0.25 },
    { name: 'content', weight: 0.15 },
  ],
  threshold: 0.4, // Typo tolerance (0 = exact match, 1 = match anything)
  includeMatches: true,
  includeScore: true,
  minMatchCharLength: 2,
  shouldSort: true,
  findAllMatches: true,
  ignoreLocation: true, // Search entire field, not just beginning
};

// Initialize Fuse instance
const fuse = new Fuse(searchableContent, fuseOptions);

// Intent-based query patterns for boosting
const intentPatterns = {
  eligibility: /\b(eligib|qualif|requir|who can|am i eligible|can i apply)\b/i,
  application: /\b(apply|application|how to|submit|process|steps|register)\b/i,
  funding: /\b(fund|grant|loan|capital|money|financ|invest)\b/i,
  support: /\b(support|help|assist|training|mentor|capabil)\b/i,
  contact: /\b(contact|email|phone|call|reach|office|address)\b/i,
  governance: /\b(govern|policy|board|oversight|manage|structur)\b/i,
  document: /\b(document|download|pdf|file|resource|summary|full document)\b/i,
};

// Detect user intent from query
function detectIntent(query: string): string[] {
  const intents: string[] = [];
  
  for (const [intent, pattern] of Object.entries(intentPatterns)) {
    if (pattern.test(query)) {
      intents.push(intent);
    }
  }
  
  return intents;
}

// Apply custom scoring based on priority and intent
function applyCustomScoring(
  results: FuseResult<SearchableContent>[],
  query: string
): SearchResult[] {
  const intents = detectIntent(query);
  
  return results.map(result => {
    let adjustedScore = result.score || 0;
    const item = result.item;
    
    // Boost by priority (higher priority = lower score = better)
    adjustedScore -= (item.priority - 3) * 0.05;
    
    // Boost FAQs for direct answer queries
    if (item.type === 'faq') {
      adjustedScore -= 0.1;
    }
    
    // Intent-based boosting
    if (intents.includes('eligibility') && item.category === 'eligibility') {
      adjustedScore -= 0.15;
    }
    if (intents.includes('application') && item.category === 'application') {
      adjustedScore -= 0.15;
    }
    if (intents.includes('funding') && item.category === 'funding') {
      adjustedScore -= 0.1;
    }
    if (intents.includes('contact') && item.type === 'contact') {
      adjustedScore -= 0.2;
    }
    if (intents.includes('document') && item.type === 'document') {
      adjustedScore -= 0.2;
    }
    
    // Ensure score stays in valid range
    adjustedScore = Math.max(0, Math.min(1, adjustedScore));
    
    return {
      ...item,
      score: adjustedScore,
      matches: result.matches?.map(m => ({
        key: m.key || '',
        value: m.value || '',
        indices: m.indices as Array<[number, number]>,
      })),
    };
  });
}

// Apply filters to results
function applyFilters(results: SearchResult[], filters: SearchFilters): SearchResult[] {
  return results.filter(result => {
    if (filters.type?.length && !filters.type.includes(result.type)) {
      return false;
    }
    if (filters.category?.length && !filters.category.includes(result.category)) {
      return false;
    }
    if (filters.audience?.length) {
      const hasMatchingAudience = result.audience.some(a => 
        filters.audience?.includes(a)
      );
      if (!hasMatchingAudience) return false;
    }
    return true;
  });
}

// Main search function
export function search(
  query: string,
  filters: SearchFilters = {},
  limit: number = 20
): SearchResult[] {
  if (!query.trim()) {
    return [];
  }
  
  // Perform fuzzy search
  const rawResults = fuse.search(query, { limit: limit * 2 });
  
  // Apply custom scoring
  let results = applyCustomScoring(rawResults, query);
  
  // Apply filters
  results = applyFilters(results, filters);
  
  // Sort by adjusted score (lower = better)
  results.sort((a, b) => a.score - b.score);
  
  // Limit results
  return results.slice(0, limit);
}

// Group results by type for display
export function groupResultsByType(results: SearchResult[]): {
  directAnswers: SearchResult[];
  guides: SearchResult[];
  documents: SearchResult[];
  sections: SearchResult[];
} {
  return {
    directAnswers: results.filter(r => r.type === 'faq'),
    guides: results.filter(r => ['guide', 'policy', 'story'].includes(r.type)),
    documents: results.filter(r => r.type === 'document'),
    sections: results.filter(r => ['section', 'contact'].includes(r.type)),
  };
}

// Get popular/suggested searches
export function getSuggestedSearches(): string[] {
  return [
    'eligibility requirements',
    'how to apply',
    'funding types',
    'download documents',
    'executive summary',
    'contact information',
  ];
}
