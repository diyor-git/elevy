import DashboardLayout from "@/pages/platform/components/layout/DashboardLayout";
import {Navigate, Route, Routes} from "react-router-dom";
import {StartupDetailPage, StartupsPage} from "@/pages/platform/pages/Startups";


function Dashboard() {
    return (
        <div>
            <DashboardLayout>
                <Routes>
                    <Route path="/startups" element={<StartupsPage/>}/>
                    <Route path="/startups/:id" element={<StartupDetailPage/>}/>

                    <Route index path="/" element={<Navigate to="/startups"/>}/>
                </Routes>

            </DashboardLayout>
        </div>
    )
}

export default Dashboard;
