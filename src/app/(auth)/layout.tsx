import NavbarAuth from "../Content/NavbarAuth";
import "../globals.css"; // Import the global CSS file

export const metadata = {
  title: "Authentication | Your Platform",
  description: "Authentication pages for login and signup",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="auth-layout">
            <NavbarAuth/>
          {children}
        </div>
      </body>
    </html>
  );
}