import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

const DebugComponent: React.FC = () => {
  const [token, setToken] = React.useState<string | null>(null);

  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const fetchToken = async () => {
      const token = await getToken();
      setToken(token);
    };

    fetchToken();
  }, [getToken, isLoaded, isSignedIn]);

  if (!token || !isLoaded || !isSignedIn) {
    return null;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText("Bearer " + token.toString());
  };

  return (
    <div className="fixed top-0 left-0 z-50">
      <Button onClick={copyToClipboard} className="p-0! text-xs!">
        Copy token
      </Button>
    </div>
  );
};

export default DebugComponent;
