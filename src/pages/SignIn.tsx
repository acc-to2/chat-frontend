import MainBtn from "../components/MainBtn";
import { generateCodeChallenge, generateCodeVerifier } from "../utils/pkce";

const SignIn = () => {
  const CLIENT_ID =
    process.env.VITE_CLIENT_ID || import.meta.env.VITE_CLIENT_ID;
  const REDIRECT_URI =
    process.env.VITE_REDIRECT_URI || import.meta.env.VITE_REDIRECT_URI;
  const TOKEN_URI =
    process.env.VITE_TOKEN_URI || import.meta.env.VITE_TOKEN_URI;

  const handleLogin = async () => {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("pkce_verifier", verifier);

    const authUrl = `${TOKEN_URI}/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=openid+email&code_challenge_method=S256&code_challenge=${challenge}`;

    window.location.href = authUrl;
  };

  return (
    <div className="flexcenter w-full">
      <div className="flexcenter w-2/6 gap-8">
        <h1 className="font-Title text-2xl">To2 Chat</h1>
        <MainBtn title="Sign in" onClick={handleLogin} />
      </div>
    </div>
  );
};

export default SignIn;
