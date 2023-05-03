"use client";
import UserProfile from "@/components/Profile";
import HistoryPage from "@/components/History";

export default function Profile() {
    // useEffect(() => {
    //     apiClient
    //         .get('user')
    //         .then((res) => {
    //             setData(res.data)
    //         }).catch((e) => {
    //         console.log(e)
    //     })
    // }, [])

    // if (data) {
    //     console.log(data)
    // }

    return (
        <div className="flex flex-col md:flex-row  md:pt-12 justify-center">
            <div className="md:pr-12"> 
            <UserProfile email={"adasd"} phone={"0213123"} userName={"Asdasds"} />
            </div>
            <div className="flex flex-col">
                <HistoryPage> </HistoryPage>
            </div>
        </div>

    );
}
