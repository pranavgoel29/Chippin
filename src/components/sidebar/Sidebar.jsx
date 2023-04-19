import "./sidebar.css";
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Board.</span>
        </Link>
      </div>
      <div className="center">
        <ul>
          <li>
            <PieChartRoundedIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <LocalOfferOutlinedIcon className="icon" />
              <span>Transactions</span>
            </li>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <CalendarMonthOutlinedIcon className="icon" />
              <span>Schedules</span>
            </li>
          </Link>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Users</span>
          </li>
          <li>
            <SettingsOutlinedIcon className="icon" />
            <span>Settings</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
