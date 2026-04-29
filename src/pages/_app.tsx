import { Outlet } from "react-router-dom";
import { Layout } from "./_components/layout";

// export const Catch = () => {
//   const error = useRouteError() as Error;
//   const isProd =
//     import.meta.env.VITE_ENVMODE?.toLowerCase().includes("prod") ||
//     import.meta.env.VITE_ENVMODE?.toLowerCase().includes("stage") ||
//     import.meta.env.VITE_ENVMODE === "";
//   return !isProd && <AuthErrorPage code={400} messages={error.message} status="error" />;
// };

// Define dataLayer types
// declare global {
//   interface Window {
//     dataLayer: any[];
//     Checkout: {
//       configure: (config: CheckoutConfig) => void;
//       showEmbeddedPage: (selector: string) => void;
//       showLightbox: () => void;
//       showPaymentPage: () => void;
//     };
//   }
// }

// dataLayer and pushDataLayer are now imported from google.ts

export default function App() {
  // const navigate = useNavigate();

  // window.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // });

  // let isCtrl = false;
  // document.onkeyup = function (e: KeyboardEvent) {
  //   if (e.keyCode == 17) isCtrl = false;
  // };

  //   document.onkeydown = function () {
  //     if (
  //       import.meta.env.VITE_ENVMODE?.toLowerCase().includes("prod") ||
  //       import.meta.env.VITE_ENVMODE === ""
  //     ) {
  //       // if dev mode
  //       // if (e.keyCode == 17)
  //       //   isCtrl = true; // ctrl in windows
  //       // else if (e.keyCode == 91) isCtrl = true; // ctrl in mac
  //       // if (e.keyCode == 83 && isCtrl == true) {
  //       //   //run code for CTRL+S -- ie, save!
  //       //   return false;
  //       // }
  //       // if (e.keyCode == 87 && isCtrl == true) {
  //       //   //run code for CTRL+W -- ie, save!
  //       //   return false;
  //       // }
  //       // if (e.keyCode == 68 && isCtrl == true) {
  //       //   //run code for CTRL+D -- ie, bookmark!
  //       //   return false;
  //       // }
  //       // if (e.keyCode == 85 && isCtrl == true) {
  //       //   //run code for CTRL+U -- ie, view source!
  //       //   return false;
  //       // }
  //       // if (e.keyCode == 65 && isCtrl == true) {
  //       //   //run code for CTRL+A -- ie, select all!
  //       //   return false;
  //       // }
  //       // if (e.keyCode == 67 && isCtrl == true) {
  //       //   //run code for CTRL+C -- ie, copy!
  //       //   return false;
  //       // }
  //       // if (e.keyCode == 44) {
  //       //   // prevent print screen
  //       //   return false;
  //       // }
  //       // if (e.keyCode == 123 || e.keyCode == 73) {
  //       //   // prevent f12
  //       //   return false;
  //       // }
  //     }
  //   };

  return (
    // <HeroUIProvider
    //   useHref={useHref}
    //   navigate={(path) => navigate(path as Path)}
    // >
    //   <NextThemesProvider attribute="class" defaultTheme="light">
    //     <SnackbarProvider>
    //       <AuthPageProvider>
    //         <LoadingProvider>
    //           <Layout showToggleSidebar>
    //             <Outlet />
    //           </Layout>
    //         </LoadingProvider>
    //       </AuthPageProvider>
    //     </SnackbarProvider>
    //   </NextThemesProvider>
    // </HeroUIProvider>
    <Layout>
      <Outlet />
    </Layout>
  );
}
