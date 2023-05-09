interface DetailParams {
    params: {
        id: string;
    };
}

export async function generateMetadata(slugs: DetailParams) {
    return {
        title: slugs.params.id,
    };
}


export default function Layout({children}: any) {
    return <>{children}</>;
}
