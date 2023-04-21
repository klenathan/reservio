"use client";
import UserProfile from "components/Profile";
import HistoryPage from "components/History";
import HistoryCard from "components/HistoryCard";

export default function Profile() {
    return (
        <div>
            <div className="flex flex-row  pt-12 justify-center">
                <UserProfile> </UserProfile>
                <div className="flex flex-col">
                    <HistoryPage> </HistoryPage>
                    <HistoryCard> </HistoryCard>
                    <HistoryCard> </HistoryCard>
                    <HistoryCard> </HistoryCard>
                </div>
            </div>
        </div>
    );
}
