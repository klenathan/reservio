"use client";
import UserProfile from "@/components/Profile";
import HistoryPage from "@/components/History";
import HistoryCard from "@/components/HistoryCard";
import {useEffect, useState} from "react";
import apiClient from "@/config/axios.config";

export default function Profile() {
    const [data, setData] = useState()

    useEffect(() => {
        apiClient
            .get('user')
            .then((res) => {
                setData(res.data)
            }).catch((e) => {
            console.log(e)
        })
    }, [])

    if (data) {
        console.log(data)
    }

    return (
        <div className="flex flex-col md:flex-row  md:pt-12 justify-center">
            <UserProfile> </UserProfile>
            <div className="flex flex-col">
                <HistoryPage> </HistoryPage>
                <HistoryCard> </HistoryCard>
                <HistoryCard> </HistoryCard>
                <HistoryCard> </HistoryCard>
            </div>
        </div>
    );
}
