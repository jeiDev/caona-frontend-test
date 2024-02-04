'use client'

import 'bootstrap/dist/css/bootstrap.css';

import MainLayout from "@components/layouts/main";
import { store } from '@redux/store';
import { Provider } from 'react-redux';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body>
        <Provider store={store}>
          <MainLayout>
            {children}
          </MainLayout>
        </Provider>
      </body>
    </html>
  );
}
