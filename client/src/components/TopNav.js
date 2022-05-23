import React from 'react';

const TopNav = () => {
    return (
        <div className="bg-white pt-4 container">
            <div className="d-flex justify-content-between pb-5">
                <div className="">
                    <img src={require("../img/logo.jpg")} style={{width:"30%"}} alt="Tee-Time Logo" />
                </div>
                <div className="d-flex gap-3 justify-content-end fs-6 mt-3">
                    <p className=" fw-bold">Dashboard</p>
                    <p className=" fw-bold">Add Round</p>
                    <p className=" fw-bold">Team</p>
                </div>
            </div>
        </div>
    )
}

export default TopNav;