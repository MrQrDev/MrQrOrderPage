export const tmp_menu = {
  id: 1,
  name: "김치찜",
  price: 12000,
  describe:
    "등촌의 대표 메뉴, 등촌 칼국수 (얼큰육수 + 야채 + 칼국수 + 볶음밥 ) + 소고기 (170g) 배달 및 포장 주문시에는 볶음밥에 계란이 제공되지 않습니다.",
  options: {
    require: [
      {
        type: "select-only-one",
        selected_items: [
          {
            name: "1단계",
            price: 0,
          },
        ],
        title: "맵기 선택",
        option_id: 1,
      },
    ],
    addition: [
      {
        type: "select-multi",
        selected_items: [
          {
            name: "김치",
            price: 500,
          },
        ],
        title: "추가 재료 선택",
        option_id: 2,
      },
    ],
  },
  is_signiture_menu: true,
  is_best_menu: false,
  country_of_origin: "돼지고기 : 국내산",
  allergy_causing_information: "",
  status: 0,
  category: {
    id: 2,
    name: "메인",
  },
  image_url: "",
};
