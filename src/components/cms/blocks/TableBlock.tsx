interface Props { data: Record<string, any>; }

const TableBlock = ({ data }: Props) => (
  <section className="py-10 md:py-14">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
      {data.heading && <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">{data.heading}</h2>}
      <div className="overflow-x-auto border-l-4 border-black bg-white shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              {(data.columns ?? []).map((c: string, i: number) => (
                <th key={i} className="px-6 py-4 text-sm font-bold uppercase tracking-wide text-black">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(data.rows ?? []).map((row: string[], ri: number) => (
              <tr key={ri} className="border-b border-gray-100 last:border-0">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-6 py-4 text-[#555555]">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

export default TableBlock;
