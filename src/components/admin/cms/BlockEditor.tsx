import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { useDocuments } from "@/hooks/useCms";
import type { BlockType } from "@/types/cms";

interface Props {
  type: BlockType;
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="text-sm font-bold text-foreground block mb-1">{label}</label>
    {children}
  </div>
);

const BlockEditor = ({ type, data, onChange }: Props) => {
  const set = (key: string, value: any) => onChange({ ...data, [key]: value });
  const { data: documents } = useDocuments(false);

  const listUpdate = (key: string, index: number, patch: Record<string, any>) => {
    const list = [...(data[key] ?? [])];
    list[index] = { ...list[index], ...patch };
    set(key, list);
  };
  const listAdd = (key: string, item: any) => set(key, [...(data[key] ?? []), item]);
  const listRemove = (key: string, index: number) =>
    set(key, (data[key] ?? []).filter((_: any, i: number) => i !== index));

  switch (type) {
    case "hero":
      return (
        <div className="space-y-4">
          <Field label="Small label above heading"><Input value={data.eyebrow ?? ""} onChange={(e) => set("eyebrow", e.target.value)} /></Field>
          <Field label="Heading"><Input value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} /></Field>
          <Field label="Highlighted words (shown in green)"><Input value={data.highlight ?? ""} onChange={(e) => set("highlight", e.target.value)} /></Field>
          <Field label="Intro text"><Textarea rows={4} value={data.body ?? ""} onChange={(e) => set("body", e.target.value)} /></Field>
        </div>
      );

    case "richtext":
      return (
        <div className="space-y-4">
          <Field label="Heading (optional)"><Input value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} /></Field>
          <Field label="Text"><Textarea rows={10} value={data.body ?? ""} onChange={(e) => set("body", e.target.value)} /></Field>
          <p className="text-xs text-muted-foreground">Line breaks are kept exactly as you type them.</p>
        </div>
      );

    case "card_grid":
      return (
        <div className="space-y-4">
          <Field label="Heading (optional)"><Input value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} /></Field>
          {(data.cards ?? []).map((card: any, i: number) => (
            <div key={i} className="border border-border rounded-md p-4 space-y-3 bg-background">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold">Card {i + 1}</span>
                <Button type="button" variant="ghost" size="sm" onClick={() => listRemove("cards", i)}><Trash2 className="h-4 w-4" /></Button>
              </div>
              <Input placeholder="Number (e.g. 01)" value={card.number ?? ""} onChange={(e) => listUpdate("cards", i, { number: e.target.value })} />
              <Input placeholder="Title" value={card.title ?? ""} onChange={(e) => listUpdate("cards", i, { title: e.target.value })} />
              <Textarea rows={4} placeholder="Text" value={card.body ?? ""} onChange={(e) => listUpdate("cards", i, { body: e.target.value })} />
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => listAdd("cards", { number: "", title: "", body: "" })}><Plus className="h-4 w-4 mr-1" /> Add card</Button>
        </div>
      );

    case "accordion":
      return (
        <div className="space-y-4">
          <Field label="Heading (optional)"><Input value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} /></Field>
          {(data.items ?? []).map((item: any, i: number) => (
            <div key={i} className="border border-border rounded-md p-4 space-y-3 bg-background">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold">Item {i + 1}</span>
                <Button type="button" variant="ghost" size="sm" onClick={() => listRemove("items", i)}><Trash2 className="h-4 w-4" /></Button>
              </div>
              <Input placeholder="Question" value={item.question ?? ""} onChange={(e) => listUpdate("items", i, { question: e.target.value })} />
              <Textarea rows={5} placeholder="Answer" value={item.answer ?? ""} onChange={(e) => listUpdate("items", i, { answer: e.target.value })} />
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => listAdd("items", { question: "", answer: "" })}><Plus className="h-4 w-4 mr-1" /> Add item</Button>
        </div>
      );

    case "stat_row":
      return (
        <div className="space-y-4">
          <Field label="Heading (optional)"><Input value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} /></Field>
          {(data.stats ?? []).map((s: any, i: number) => (
            <div key={i} className="flex gap-2 items-center">
              <Input placeholder="Value" value={s.value ?? ""} onChange={(e) => listUpdate("stats", i, { value: e.target.value })} />
              <Input placeholder="Label" value={s.label ?? ""} onChange={(e) => listUpdate("stats", i, { label: e.target.value })} />
              <Button type="button" variant="ghost" size="sm" onClick={() => listRemove("stats", i)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => listAdd("stats", { value: "", label: "" })}><Plus className="h-4 w-4 mr-1" /> Add statistic</Button>
        </div>
      );

    case "cta":
      return (
        <div className="space-y-4">
          <Field label="Heading"><Input value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} /></Field>
          <Field label="Text"><Textarea rows={3} value={data.body ?? ""} onChange={(e) => set("body", e.target.value)} /></Field>
          <Field label="Button label"><Input value={data.button_label ?? ""} onChange={(e) => set("button_label", e.target.value)} /></Field>
          <Field label="Button link"><Input value={data.button_href ?? ""} onChange={(e) => set("button_href", e.target.value)} placeholder="/contacts or https://..." /></Field>
        </div>
      );

    case "image":
      return (
        <div className="space-y-4">
          <ImageUploadField label="Image" value={data.url ?? ""} onChange={(url) => set("url", url)} />
          <Field label="Alt text (for accessibility)"><Input value={data.alt ?? ""} onChange={(e) => set("alt", e.target.value)} /></Field>
          <Field label="Caption (optional)"><Input value={data.caption ?? ""} onChange={(e) => set("caption", e.target.value)} /></Field>
        </div>
      );

    case "pillars":
      return (
        <div className="space-y-4">
          <Field label="Heading (optional)"><Input value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} /></Field>
          <Field label="In-page link name (optional)"><Input value={data.anchor ?? ""} onChange={(e) => set("anchor", e.target.value)} placeholder="path-to-funding" /></Field>
          {(data.steps ?? []).map((step: any, i: number) => (
            <div key={i} className="border border-border rounded-md p-4 space-y-3 bg-background">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold">Step {i + 1}</span>
                <Button type="button" variant="ghost" size="sm" onClick={() => listRemove("steps", i)}><Trash2 className="h-4 w-4" /></Button>
              </div>
              <Input placeholder="Number (e.g. 01)" value={step.number ?? ""} onChange={(e) => listUpdate("steps", i, { number: e.target.value })} />
              <Input placeholder="Title" value={step.title ?? ""} onChange={(e) => listUpdate("steps", i, { title: e.target.value })} />
              <Textarea rows={4} placeholder="Text" value={step.body ?? ""} onChange={(e) => listUpdate("steps", i, { body: e.target.value })} />
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => listAdd("steps", { number: "", title: "", body: "" })}><Plus className="h-4 w-4 mr-1" /> Add step</Button>
        </div>
      );

    case "two_column":
      return (
        <div className="space-y-4">
          <Field label="Heading (optional)"><Input value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} /></Field>
          <Field label="Text"><Textarea rows={8} value={data.body ?? ""} onChange={(e) => set("body", e.target.value)} /></Field>
          <ImageUploadField label="Image" value={data.image_url ?? ""} onChange={(url) => set("image_url", url)} />
          <Field label="Image alt text"><Input value={data.image_alt ?? ""} onChange={(e) => set("image_alt", e.target.value)} /></Field>
          <Field label="Image side">
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={data.image_position ?? "right"}
              onChange={(e) => set("image_position", e.target.value)}
            >
              <option value="right">Right</option>
              <option value="left">Left</option>
            </select>
          </Field>
          <Field label="In-page link name (optional)"><Input value={data.anchor ?? ""} onChange={(e) => set("anchor", e.target.value)} /></Field>
        </div>
      );

    case "intro_split":
      return (
        <div className="space-y-4">
          <Field label="Small label above heading"><Input value={data.eyebrow ?? ""} onChange={(e) => set("eyebrow", e.target.value)} /></Field>
          <Field label="Heading"><Input value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} /></Field>
          <Field label="Lead paragraph (larger text)"><Textarea rows={5} value={data.lead ?? ""} onChange={(e) => set("lead", e.target.value)} /></Field>
          <Field label="Supporting paragraph"><Textarea rows={4} value={data.body ?? ""} onChange={(e) => set("body", e.target.value)} /></Field>
          <ImageUploadField label="Back image" value={data.back_image_url ?? ""} onChange={(url) => set("back_image_url", url)} />
          <Field label="Back image alt text"><Input value={data.back_image_alt ?? ""} onChange={(e) => set("back_image_alt", e.target.value)} /></Field>
          <ImageUploadField label="Front image" value={data.front_image_url ?? ""} onChange={(url) => set("front_image_url", url)} />
          <Field label="Front image alt text"><Input value={data.front_image_alt ?? ""} onChange={(e) => set("front_image_alt", e.target.value)} /></Field>
          <Field label="In-page link name (optional)"><Input value={data.anchor ?? ""} onChange={(e) => set("anchor", e.target.value)} /></Field>
        </div>
      );

    case "image_list":
      return (
        <div className="space-y-4">
          <Field label="Small label above heading"><Input value={data.eyebrow ?? ""} onChange={(e) => set("eyebrow", e.target.value)} /></Field>
          <Field label="Heading"><Input value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} /></Field>
          <ImageUploadField label="Image" value={data.image_url ?? ""} onChange={(url) => set("image_url", url)} />
          <Field label="Image alt text"><Input value={data.image_alt ?? ""} onChange={(e) => set("image_alt", e.target.value)} /></Field>
          <Field label="Image side">
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={data.image_position ?? "left"}
              onChange={(e) => set("image_position", e.target.value)}
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </Field>
          <div className="space-y-2">
            <label className="text-sm font-bold block">List points</label>
            {(data.items ?? []).map((item: any, i: number) => (
              <div key={i} className="flex gap-2 items-start">
                <Textarea
                  rows={2}
                  value={typeof item === "string" ? item : item?.text ?? ""}
                  onChange={(e) => {
                    const list = [...(data.items ?? [])];
                    list[i] = e.target.value;
                    set("items", list);
                  }}
                />
                <Button type="button" variant="ghost" size="sm" onClick={() => listRemove("items", i)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => listAdd("items", "")}><Plus className="h-4 w-4 mr-1" /> Add point</Button>
          </div>
          <Field label="In-page link name (optional)"><Input value={data.anchor ?? ""} onChange={(e) => set("anchor", e.target.value)} /></Field>
        </div>
      );

    case "side_label":
      return (
        <div className="space-y-4">
          <Field label="Heading"><Input value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} /></Field>
          <Field label="Large side label (defaults to the heading)"><Input value={data.side_label ?? ""} onChange={(e) => set("side_label", e.target.value)} placeholder="METHOD" /></Field>
          <div className="space-y-2">
            <label className="text-sm font-bold block">Paragraphs</label>
            {(data.paragraphs ?? []).map((p: any, i: number) => (
              <div key={i} className="flex gap-2 items-start">
                <Textarea
                  rows={3}
                  value={typeof p === "string" ? p : p?.text ?? ""}
                  onChange={(e) => {
                    const list = [...(data.paragraphs ?? [])];
                    list[i] = e.target.value;
                    set("paragraphs", list);
                  }}
                />
                <Button type="button" variant="ghost" size="sm" onClick={() => listRemove("paragraphs", i)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => listAdd("paragraphs", "")}><Plus className="h-4 w-4 mr-1" /> Add paragraph</Button>
          </div>
          <Field label="In-page link name (optional)"><Input value={data.anchor ?? ""} onChange={(e) => set("anchor", e.target.value)} /></Field>
        </div>
      );

    case "feature_cards":
      return (
        <div className="space-y-4">
          <Field label="Small label above heading"><Input value={data.eyebrow ?? ""} onChange={(e) => set("eyebrow", e.target.value)} /></Field>
          <Field label="Heading"><Input value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} /></Field>
          <Field label="Intro text (optional)"><Textarea rows={3} value={data.intro ?? ""} onChange={(e) => set("intro", e.target.value)} /></Field>
          {(data.cards ?? []).map((card: any, i: number) => (
            <div key={i} className="border border-border rounded-md p-4 space-y-3 bg-background">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold">Card {i + 1}</span>
                <Button type="button" variant="ghost" size="sm" onClick={() => listRemove("cards", i)}><Trash2 className="h-4 w-4" /></Button>
              </div>
              <Input placeholder="Number (e.g. 01)" value={card.number ?? ""} onChange={(e) => listUpdate("cards", i, { number: e.target.value })} />
              <Input placeholder="Title" value={card.title ?? ""} onChange={(e) => listUpdate("cards", i, { title: e.target.value })} />
              <Textarea
                rows={6}
                placeholder="Paragraphs — leave a blank line between each"
                value={(Array.isArray(card.paragraphs) ? card.paragraphs : [card.body ?? ""]).join("\n\n")}
                onChange={(e) => listUpdate("cards", i, { paragraphs: e.target.value.split("\n\n") })}
              />
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => listAdd("cards", { number: "", title: "", paragraphs: [""] })}><Plus className="h-4 w-4 mr-1" /> Add card</Button>
          <Field label="In-page link name (optional)"><Input value={data.anchor ?? ""} onChange={(e) => set("anchor", e.target.value)} /></Field>
        </div>
      );

    case "anchor":
      return (
        <div className="space-y-4">
          <Field label="In-page link name"><Input value={data.anchor ?? ""} onChange={(e) => set("anchor", e.target.value)} placeholder="market-segments" /></Field>
          <p className="text-xs text-muted-foreground">Menu links ending in #{data.anchor || "name"} will jump to this point on the page.</p>
        </div>
      );


    case "document_list":
      return (
        <div className="space-y-4">
          <Field label="Heading"><Input value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} /></Field>
          <div>
            <label className="text-sm font-bold block mb-2">Documents to show</label>
            <div className="space-y-2">
              {(documents ?? []).map((doc) => {
                const ids: string[] = data.document_ids ?? [];
                const checked = ids.includes(doc.id);
                return (
                  <label key={doc.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) =>
                        set("document_ids", e.target.checked ? [...ids, doc.id] : ids.filter((id) => id !== doc.id))
                      }
                    />
                    {doc.title}
                    {!doc.visible && <span className="text-xs text-muted-foreground">(hidden)</span>}
                  </label>
                );
              })}
              {!documents?.length && <p className="text-sm text-muted-foreground">No documents uploaded yet.</p>}
            </div>
          </div>
        </div>
      );

    case "table":
      return (
        <div className="space-y-4">
          <Field label="Heading (optional)"><Input value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} /></Field>
          <div>
            <label className="text-sm font-bold block mb-2">Columns</label>
            <div className="space-y-2">
              {(data.columns ?? []).map((c: string, i: number) => (
                <div key={i} className="flex gap-2">
                  <Input value={c} onChange={(e) => {
                    const cols = [...data.columns]; cols[i] = e.target.value; set("columns", cols);
                  }} />
                  <Button type="button" variant="ghost" size="sm" onClick={() => {
                    set("columns", data.columns.filter((_: string, x: number) => x !== i));
                    set("rows", (data.rows ?? []).map((r: string[]) => r.filter((_, x) => x !== i)));
                  }}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => {
                onChange({
                  ...data,
                  columns: [...(data.columns ?? []), "New column"],
                  rows: (data.rows ?? []).map((r: string[]) => [...r, ""]),
                });
              }}><Plus className="h-4 w-4 mr-1" /> Add column</Button>
            </div>
          </div>
          <div>
            <label className="text-sm font-bold block mb-2">Rows</label>
            <div className="space-y-2">
              {(data.rows ?? []).map((row: string[], ri: number) => (
                <div key={ri} className="flex gap-2">
                  {row.map((cell, ci) => (
                    <Input key={ci} value={cell} onChange={(e) => {
                      const rows = (data.rows ?? []).map((r: string[]) => [...r]);
                      rows[ri][ci] = e.target.value;
                      set("rows", rows);
                    }} />
                  ))}
                  <Button type="button" variant="ghost" size="sm" onClick={() => set("rows", data.rows.filter((_: any, x: number) => x !== ri))}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => set("rows", [...(data.rows ?? []), (data.columns ?? []).map(() => "")])}><Plus className="h-4 w-4 mr-1" /> Add row</Button>
            </div>
          </div>
        </div>
      );

    case "contact_hero":
      return (
        <div className="space-y-4">
          <Field label="Small label above heading (optional)"><Input value={data.eyebrow ?? ""} onChange={(e) => set("eyebrow", e.target.value)} /></Field>
          <Field label="Heading"><Input value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} /></Field>
          <Field label="Intro text"><Textarea rows={4} value={data.body ?? ""} onChange={(e) => set("body", e.target.value)} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Main button label"><Input value={data.primary_label ?? ""} onChange={(e) => set("primary_label", e.target.value)} /></Field>
            <Field label="Main button link"><Input placeholder="mailto:info@example.com" value={data.primary_href ?? ""} onChange={(e) => set("primary_href", e.target.value)} /></Field>
            <Field label="Second button label"><Input value={data.secondary_label ?? ""} onChange={(e) => set("secondary_label", e.target.value)} /></Field>
            <Field label="Second button link"><Input placeholder="tel:+27861113186" value={data.secondary_href ?? ""} onChange={(e) => set("secondary_href", e.target.value)} /></Field>
          </div>
          <ImageUploadField label="Side image / QR code" value={data.image_url ?? ""} onChange={(url) => set("image_url", url)} />

          <Field label="Image description (for screen readers)"><Input value={data.image_alt ?? ""} onChange={(e) => set("image_alt", e.target.value)} /></Field>
          <Field label="Image links to (optional)"><Input value={data.image_href ?? ""} onChange={(e) => set("image_href", e.target.value)} /></Field>
          <Field label="Caption under image (optional)"><Input value={data.image_caption ?? ""} onChange={(e) => set("image_caption", e.target.value)} /></Field>
          <Field label="In-page link name (optional)"><Input value={data.anchor ?? ""} onChange={(e) => set("anchor", e.target.value)} /></Field>
        </div>
      );

    case "contact_cards":
      return (
        <div className="space-y-4">
          <Field label="Heading (optional)"><Input value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} /></Field>
          {(data.cards ?? []).map((card: any, i: number) => {
            const lines: any[] = Array.isArray(card.lines) ? card.lines : [];
            const setLines = (next: any[]) => listUpdate("cards", i, { lines: next });
            return (
              <div key={i} className="border border-border rounded-md p-4 space-y-3 bg-background">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">Card {i + 1}</span>
                  <Button type="button" variant="ghost" size="sm" onClick={() => listRemove("cards", i)}><Trash2 className="h-4 w-4" /></Button>
                </div>
                <Field label="Icon">
                  <select
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                    value={card.icon ?? "mail"}
                    onChange={(e) => listUpdate("cards", i, { icon: e.target.value })}
                  >
                    <option value="mail">Email</option>
                    <option value="phone">Phone</option>
                    <option value="address">Address / pin</option>
                    <option value="clock">Clock / hours</option>
                    <option value="globe">Website</option>
                    <option value="message">Message</option>
                  </select>
                </Field>
                <Input placeholder="Title" value={card.title ?? ""} onChange={(e) => listUpdate("cards", i, { title: e.target.value })} />
                <div className="space-y-2">
                  {lines.map((line, li) => {
                    const text = typeof line === "string" ? line : line.text ?? "";
                    const href = typeof line === "string" ? "" : line.href ?? "";
                    return (
                      <div key={li} className="flex gap-2">
                        <Input placeholder="Text" value={text} onChange={(e) => {
                          const next = [...lines]; next[li] = { text: e.target.value, href }; setLines(next);
                        }} />
                        <Input placeholder="Link (optional)" value={href} onChange={(e) => {
                          const next = [...lines]; next[li] = { text, href: e.target.value }; setLines(next);
                        }} />
                        <Button type="button" variant="ghost" size="sm" onClick={() => setLines(lines.filter((_, x) => x !== li))}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    );
                  })}
                  <Button type="button" variant="outline" size="sm" onClick={() => setLines([...lines, { text: "", href: "" }])}><Plus className="h-4 w-4 mr-1" /> Add line</Button>
                </div>
              </div>
            );
          })}
          <Button type="button" variant="outline" size="sm" onClick={() => listAdd("cards", { icon: "mail", title: "", lines: [{ text: "", href: "" }] })}><Plus className="h-4 w-4 mr-1" /> Add card</Button>
          <Field label="In-page link name (optional)"><Input value={data.anchor ?? ""} onChange={(e) => set("anchor", e.target.value)} /></Field>
        </div>
      );

    case "map":
      return (
        <div className="space-y-4">
          <Field label="Heading (optional)"><Input value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} /></Field>
          <Field label="Address to show on the map"><Input value={data.address ?? ""} onChange={(e) => set("address", e.target.value)} placeholder="70 Grayston Drive, Sandown, Sandton, 2196" /></Field>
          <Field label="Zoom level (1 = world, 20 = street)"><Input type="number" min={1} max={20} value={data.zoom ?? 15} onChange={(e) => set("zoom", Number(e.target.value))} /></Field>
          <Field label="Custom embed link (advanced, optional)"><Input value={data.embed_url ?? ""} onChange={(e) => set("embed_url", e.target.value)} /></Field>
          <Field label="In-page link name (optional)"><Input value={data.anchor ?? ""} onChange={(e) => set("anchor", e.target.value)} /></Field>
        </div>
      );

    case "contact_form":
      return (
        <div className="space-y-4">
          <Field label="Heading"><Input value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} /></Field>
          <Field label="Intro text (optional)"><Textarea rows={3} value={data.intro ?? ""} onChange={(e) => set("intro", e.target.value)} /></Field>
          <Field label="Send messages to (email address)"><Input value={data.recipient ?? ""} onChange={(e) => set("recipient", e.target.value)} placeholder="info@sa-transformationfund.co.za" /></Field>
          <Field label="Button label"><Input value={data.button_label ?? ""} onChange={(e) => set("button_label", e.target.value)} /></Field>
          <Field label="In-page link name"><Input value={data.anchor ?? ""} onChange={(e) => set("anchor", e.target.value)} placeholder="contact-form" /></Field>
          <p className="text-xs text-muted-foreground">The form opens the visitor's own email app with their message pre-filled.</p>
        </div>
      );

    default:
      return null;
  }

};

export default BlockEditor;
