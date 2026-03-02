import TopBar from "@/components/TopBar";
import AppSidebar from "@/components/AppSidebar";
import ContactsTable from "@/components/ContactsTable";

const Contacts = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <ContactsTable />
      </div>
    </div>
  );
};

export default Contacts;
