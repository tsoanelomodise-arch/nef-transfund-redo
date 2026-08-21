import AdminLayout from "@/components/admin/AdminLayout";

const steps = [
  { title: "Editing an existing page", body: "Open Pages, click Edit next to the page, change the text or images in each section, then click Save draft. Nothing on the live website changes until you click Publish." },
  { title: "Previewing before you publish", body: "Click Preview in the page editor. This opens the page exactly as visitors will see it, with a 'Draft preview' badge in the corner. Close the tab when you are done." },
  { title: "Publishing", body: "Click Publish in the page editor. The page becomes live immediately at its web address. You can take it down again with Unpublish on the Pages list." },
  { title: "Creating a new page", body: "On the Pages screen, type a title and a web address, then click New page. Add sections with the 'Add section' dropdown at the bottom of the editor, and publish when ready." },
  { title: "Adding a page to the menu", body: "Open Navigation, enter the label and the link (for example /our-impact), choose whether it sits at the top level or under an existing menu, and click Add." },
  { title: "Uploading a document", body: "Open Documents and drag your PDF into the upload area. Rename it if needed. To show it on a page, add a 'Document list' section to that page and tick the document." },
  { title: "News, stories and jobs", body: "Use the News & Media and Careers screens. Items only appear on the website once their status is set to approved or published." },
];

const AdminGuide = () => (
  <AdminLayout>
    <h1 className="text-3xl font-black tracking-tight text-black mb-2">How to maintain the website</h1>
    <p className="text-sm text-gray-500 mb-8">A short guide to everything you can change yourself.</p>
    <div className="space-y-4 max-w-3xl">
      {steps.map((s, i) => (
        <div key={i} className="admin-card bg-white p-6 md:p-8">
          <h2 className="font-bold text-lg mb-2">{s.title}</h2>
          <p className="text-gray-500">{s.body}</p>
        </div>
      ))}
    </div>
  </AdminLayout>
);

export default AdminGuide;
