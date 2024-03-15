import { auth, signOut } from "@/auth";

const SettingsPage = () => {
  // const session = await auth();
  return (
    <div>HELLO WORLD</div>
    // <div>
    //   HELOLO WORLD!
    //   <div> Session: {JSON.stringify(session)}</div>
    //   <form
    //     action={async () => {
    //       "use server";
    //       await signOut();
    //     }}
    //   >
    //     <button type={"submit"}>Sign Out!</button>
    //   </form>
    // </div>
  );
};

export default SettingsPage;
