import DashboardLayout from "@/pages/platform/components/layout/DashboardLayout";
import {Navigate, Route, Routes} from "react-router-dom";
import {CreateStartup, StartupDetailPage, StartupsPage} from "@/pages/platform/pages/Startups";


function Dashboard() {
    return (
        <div>
            <DashboardLayout>
                <Routes>
                    <Route path="/startups" element={<StartupsPage/>}/>
                    <Route path="/startups/:id" element={<StartupDetailPage/>}/>

                    <Route path="/my-startups/create" element={<CreateStartup/>}/>

                    <Route index path="/" element={<Navigate to="/startups"/>}/>
                </Routes>

            </DashboardLayout>
        </div>
    )
}

export default Dashboard;
