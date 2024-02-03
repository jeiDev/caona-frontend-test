'use client';
import React from "react";
import Header from "./header";
import { MainLayoutPropsI } from "./main.interface";

const MainLayout = ({ children }: MainLayoutPropsI) => {
    return (
        <React.Fragment>
            <Header />
            <div className="container-fluid" style={{  paddingTop: 80 }}>
                {children}
            </div>
        </React.Fragment>
    )
}

export default MainLayout