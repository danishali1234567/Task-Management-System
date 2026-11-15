
import React from "react";
import { UserRound, Mail, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <>
      <div className="welcome-row">
        <div>
          <span className="eyebrow">ACCOUNT SETTINGS</span>
          <h1>My Profile</h1>
          <p>View your personal account information.</p>
        </div>
      </div>

      <section className="panel profile-panel">
        <div className="profile-cover">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="profile-details">
          <h2>{user?.name}</h2>
          <p>TaskFlow Member</p>

          <div className="profile-info">
            <div>
              <UserRound size={19} />
              <span>Full Name</span>
              <strong>{user?.name}</strong>
            </div>

            <div>
              <Mail size={19} />
              <span>Email Address</span>
              <strong>{user?.email}</strong>
            </div>

            <div>
              <ShieldCheck size={19} />
              <span>Account Status</span>
              <strong className="verified-text">Active</strong>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
