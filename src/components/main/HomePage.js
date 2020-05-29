import React from "react";
import ContentListWhiteFetch from "./ContentListWhiteFetch";
import ContentListDarkFetch from "./ContentListDarkFetch";
import HeaderBackground from "../layout/HeaderBackground";

function HomePage() {
  return (
    <main>
      <HeaderBackground />
      <ContentListWhiteFetch type={"highest"} />
      <ContentListDarkFetch />
      <ContentListWhiteFetch type={"latest"} />
    </main>
  );
}

export default HomePage;
