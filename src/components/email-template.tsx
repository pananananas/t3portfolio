import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  title: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  fullName,
  title,
  email,
  message,
}) => (
  <div>
    <h1>Welcome, {fullName}!</h1>
    <p>
      You have a new message from {email} with the title: {title}
    </p>
    <p>{message}</p>
  </div>
);
