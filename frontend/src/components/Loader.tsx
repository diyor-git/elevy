import {LoaderCircle} from "lucide-react";

function Loader() {
    return (
        <div className="flex justify-center items-center">
            <LoaderCircle className="animate-spin h-10 w-10"/>
        </div>
    )
}

export default Loader;