// interface DetailParams {
//     params: {
//         id: string;
//     };
// }

// export async function generateMetadata(slugs: DetailParams) {
//     return {
//         title: slugs.params.id,
//     };
// }

export const metadata = {
    title: 'Services',
  };
   
export default function Layout({children}: any) {
    return <>{children}</>;
}
