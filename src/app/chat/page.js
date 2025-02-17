import { Suspense } from "react";
import ChatComponent from "../../compoments/ChatComponent";

export default function Chat() {
  return (
    <Suspense>
        <ChatComponent />
    </Suspense>
  );
}
