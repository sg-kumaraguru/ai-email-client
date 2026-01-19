import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import EmailList from "../components/EmailList";
import EmailContent from "../components/EmailContent";

import { useAuth } from "../contexts/AuthContext";


import emailData from "../data/emails.json";

const Dashboard = () => {
  const { user } = useAuth();

  // temporary data for design purpose
  const emails = emailData;
  const showList = true;

  return (
    <div className="h-screen flex flex-col bg-neutral-50">
      <TopBar username={user.name}/>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:flex w-64 border-r border-neutral-200 bg-white">
          <SideBar />
        </aside>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-2">
          {showList ? (
            <EmailList emails={emails} />
          ) : (
            <EmailContent email={emails[0]} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
