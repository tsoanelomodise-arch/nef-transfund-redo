
-- Add length constraints to news_media table
ALTER TABLE news_media
  ADD CONSTRAINT news_media_title_length CHECK (char_length(title) <= 500),
  ADD CONSTRAINT news_media_excerpt_length CHECK (excerpt IS NULL OR char_length(excerpt) <= 2000),
  ADD CONSTRAINT news_media_full_content_length CHECK (full_content IS NULL OR char_length(full_content) <= 100000),
  ADD CONSTRAINT news_media_source_url_length CHECK (source_url IS NULL OR char_length(source_url) <= 2048),
  ADD CONSTRAINT news_media_video_url_length CHECK (video_url IS NULL OR char_length(video_url) <= 2048),
  ADD CONSTRAINT news_media_featured_image_url_length CHECK (featured_image_url IS NULL OR char_length(featured_image_url) <= 2048),
  ADD CONSTRAINT news_media_story_thumbnail_url_length CHECK (story_thumbnail_url IS NULL OR char_length(story_thumbnail_url) <= 2048);

-- Add length constraints to careers table
ALTER TABLE careers
  ADD CONSTRAINT careers_title_length CHECK (char_length(title) <= 300),
  ADD CONSTRAINT careers_slug_length CHECK (char_length(slug) <= 300),
  ADD CONSTRAINT careers_summary_length CHECK (summary IS NULL OR char_length(summary) <= 2000),
  ADD CONSTRAINT careers_description_length CHECK (description IS NULL OR char_length(description) <= 100000),
  ADD CONSTRAINT careers_responsibilities_length CHECK (responsibilities IS NULL OR char_length(responsibilities) <= 100000),
  ADD CONSTRAINT careers_requirements_length CHECK (requirements IS NULL OR char_length(requirements) <= 100000),
  ADD CONSTRAINT careers_salary_range_length CHECK (salary_range IS NULL OR char_length(salary_range) <= 200),
  ADD CONSTRAINT careers_apply_url_length CHECK (apply_url IS NULL OR char_length(apply_url) <= 2048);
