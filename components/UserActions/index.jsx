import React from "react";
import styles from "./.module.sass";
import { AiOutlinePoweroff } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { connect } from "react-redux";
export default connect((state) => state)(function ({ user }) {
  return (
    <div className={styles.user_actions_area}>
      <Link href={"/profile"}>
        <a className={styles.user_profile_btn}>
          <div className={styles.user_avatar}>
            <Image
              quality={100}
              width={32}
              height={32}
              src={user?.images[0]?.url}
              alt="user_avatar"
            />
          </div>
          <span>{user?.display_name}</span>
        </a>
      </Link>
      <div className={styles.logout_btn}>
        <a
          href="logout"
          onClick={(e) => {
            e.preventDefault();
            window.localStorage.setItem("token", null);
            window.location.reload();
          }}
        >
          <AiOutlinePoweroff />
        </a>
      </div>
    </div>
  );
});
