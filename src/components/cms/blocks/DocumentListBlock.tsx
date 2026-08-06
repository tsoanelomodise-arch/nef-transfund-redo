import { FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useDocuments, signedDocumentUrl } from "@/hooks/useCms";

interface Props { data: Record<string, any>; }

const DocumentListBlock = ({ data }: Props) => {
  const { data: documents } = useDocuments(true);
  const ids: string[] = data.document_ids ?? [];
  const selected = (documents ?? []).filter((d) => (ids.length ? ids.includes(d.id) : true));

  const { data: links } = useQuery({
    queryKey: ["cms-doc-links", selected.map((d) => d.id).join(",")],
    enabled: selected.length > 0,
    queryFn: async () => {
      const entries = await Promise.all(
        selected.map(async (d) => [d.id, await signedDocumentUrl(d.storage_path)] as const)
      );
      return Object.fromEntries(entries) as Record<string, string>;
    },
  });

  if (!selected.length) return null;

  return (
    <section className="py-10 md:py-14">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {data.heading && <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">{data.heading}</h2>}
        <div className="flex flex-wrap gap-4">
          {selected.map((doc) => (
            <a
              key={doc.id}
              href={links?.[doc.id] ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#00703C] hover:bg-[#005c30] text-white font-bold px-6 py-3 rounded-md transition-colors shadow-md hover:shadow-lg"
            >
              <FileText className="w-5 h-5" />
              {doc.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DocumentListBlock;
