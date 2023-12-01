import { Link } from "react-router-dom";
import { Stock } from "../util/types";
import { IMAGE_URL } from "../api";

interface MenuCardProps extends Stock {
  css?: string;
}

function MenuCard({
  name,
  price,
  describe,
  is_signiture_menu,
  is_best_menu,
  country_of_origin,
  allergy_causing_information,
  status,
  image_url,
  id,
  css,
}: MenuCardProps) {
  return (
    <Link
      to={`/store/${name}/${id}`} // 수정된 경로
      style={{ borderBottom: "0.4px solid #E5E5E5" }}
      className={`flex items-center justify-between p-5 border-LineGray ${css}}`}
    >
      <div className="flex flex-col items-start gap-[9px]">
        <h1 className="medium">{name}</h1>
        <p className="line-clamp-2 w-3/4 text-[14px] text-grayLight text-start light">
          {describe}
        </p>
        <span className="medium">{price.toLocaleString()}원</span>
      </div>
      <img
        className="w-[80px] h-[80px] object-cover rounded-md"
        src={`/images/menuImage/example.png`}
        alt={name}
      />
    </Link>
  );
}

export default MenuCard;
