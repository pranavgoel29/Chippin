import "./widget.css";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';


const Widget = ({ type:any }) => {
  let data={
    title:"abc",
    isMoney:false,
    icon:""
  };
  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "Total User",
        isMoney: false,
        color:"#DEE0EF",
        icon: (
          <PeopleAltOutlinedIcon
            className="icon"
            
          />
        ),
      };
      break;
    case "transaction":
      data = {
        title: "Total Transaction",
        isMoney: false,
        color:"#F4ECDD",
        icon: (
          <LocalOfferOutlinedIcon
            className="icon"
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "Total Revenues",
        isMoney: true,
        color:"#DDEFE0",
        icon: (
          <CurrencyExchangeOutlinedIcon
            className="icon"
          />
        ),
      };
      break;
    case "like":
      data = {
        title: "Total Likes",
        isMoney: false,
        color:"#EFDADA",
        icon: (
          <ThumbUpOffAltOutlinedIcon
            className="icon"
          />
        ),
      };
      break;
    default:
      break;
  }
  const c=data.color;
  return (
    <div className="widget" style={{backgroundColor:`${c}`}}>
      <div className="left">
        <span className="title">{data?.title}</span>
        <span className="counter">
          {data?.isMoney && "$"} {amount}
        </span>
      </div>
      <div className="right">
        {data?.icon}
      </div>
    </div>
  );
};

export default Widget;
