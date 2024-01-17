## 💻 반장창고

<p align="center" width="100%">

<img src="https://github.com/future9061/BanJangChangGo/assets/132829711/2437d748-a6fb-4792-9a04-ca713cdea385" width="20%">
<img src="https://github.com/future9061/BanJangChangGo/assets/132829711/1e3f348c-e6c9-4485-97a1-64c734e3be42" width="20%">
<img src="https://github.com/future9061/BanJangChangGo/assets/132829711/01027603-fc1a-473c-91dc-4805ae7e454d" width="20.3%">
<img src="https://github.com/future9061/BanJangChangGo/assets/132829711/88efcf4c-60c1-4f1f-9ef3-3079918c76c7" width="20%">
</p>

## 🔗URL

- https://banjangchanggo.netlify.app

<br/>

## 💡 개발 환경

- **Deploy** : `netlify(client)` `glitch(json-server)`
- **Language** : `typescript(4.9.5)`
- **Framework** : `react(18.2.0)`
- **Library** : `reduxjs/toolkit(1.9.5)` `react-query(3.39.3)` `react-router-dom(6.14.0)`
- **Style** : `styled-components(6.1.8)`

<br/>

## 📁 directory 구조

```
📦src
 ┣ 📂apis
 ┣ 📂components
 ┣ 📂db
 ┣ 📂pages
 ┣ 📂store
 ┣ 📂style
 ┣ 📂types
 ┣ 📜App.tsx
 ┗ 📜index.tsx

```

<br/>

## 📃 코드 리뷰

#### _조건 1.페이지에 들어오면 바로 주문 아이템을 불러와 주세요._

- order 페이지가 랜더링 되면 useQuery로 데이터를 요청합니다.
- 통신이 성공했을 경우 데이터 전역 관리를 위해 redux-toolkit의 dispatch를 이용합니다.

```typescript
// pages > order.tsx

const { isLoading } = useQuery<ItemsType, AxiosError>(
  "itemsKey",
  FetchItems(),
  {
    refetchOnWindowFocus: false,
  }
);
```

```typescript
//apis > FetchItems.tsx

const fetchItems = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_URL}/items`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await fetchItems();
      dispatch(getData(data));
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);
```

<br/>

#### _조건 2.주문 아이템을 불러오는 요청의 로딩 표시를 해주세요._

- useQuery로 통신하여 isLoading을 반환받고, isLoading이 true라면 요청 로딩 표시를 적용합니다.

```typescript
//pages > order.tsx

const Waiting = () => (
  <div className="waiting">
    <p>
      목록을
      <br /> 불러오고 있습니다
    </p>
  </div>
);

return (
  <OrderCSS>
    <Header />
    {isLoading ? Waiting() : <Items />}
  </OrderCSS>
);
```

<br/>

#### _조건 3.Counter를 활용해 주문 아이템의 개수를 조작할 수 있게 구현해 주세요._

- 데이터 fetch가 성공하고 각 데이터에 counter 프로퍼티를 생성합니다.

```typescript
//apis > FetchItems.tsx

try {
  const res = await axios.get(`${process.env.REACT_APP_URL}/items`);
  res.data.map((n: ItemType) => {
    n.counter = 0;
    return n;
  });
  return res.data;
} catch (error) {
  throw error;
}
```

<br />

- 주문 아이템의 개수를 조작할 때, 각 아이템의 가격과 수량이 맞게 변해야 합니다.
  - store에 저장된 데이터를 조작하는 reducers 함수를 생성합니다.
  - 버튼 클릭 시 해당 데이터의 고유의 id와 index를 인자로 전달하며 ditpatch로 생성한 함수를 실행합니다.
  - state의 counter가 변경될 때에는 최소수량 0, 최대수량 999 이므로 조건문을 적용합니다.

```typescript
//components > Items.tsx

const PlusCounter = (id: string) => {
  const targetIdx = Items.findIndex((item) => item.id === id);
  dispatch(increment({ idx: targetIdx, id: Items[targetIdx].id }));
};

<span onClick={() => PlusCounter(elem.id as string)}>+</span>;
```

```typescript
//store > ItemSlice.tsx

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    getData: (_, action: PayloadAction<ItemsType>) => {
      return action.payload;
    },
    increment: (state, action: PayloadAction<{ idx: number; id: string }>) => {
      const { id, idx } = action.payload;
      const targetItem = state[idx];

      if (targetItem && targetItem.id === id) {
        if (targetItem.counter < 999) {
          targetItem.counter += 1;
        }
      }
    },
    decrement: (state, action: PayloadAction<{ idx: number; id: string }>) => {
      // ...생략
    },
  },
});
```

<br />

- 주문 아이템의 개수를 조작할 때, 각 아이템의 가격과 하단 총 가격, 하단 총 수량이 맞게 변해야 합니다.

  - items의 counter들의 총 개수를 reduce로 구합니다

  ```typescript
  // components > OrderSheet.tsx
  const Items = useSelector((state: RootState) => state.items);

  const totalCouter = Items.reduce(
    (a, c) => {
      return { counter: a.counter + c.counter };
    },
    { counter: 0 }
  );
  ```

  - items의 counter들의 총 금액은 아이템의 counter \* price의 값으로 구합니다.

  ```typescript
  // conponents > OrderSheet.tsx
  const Items = useSelector((state: RootState) => state.items);

  const totalPrice = Items.reduce(
    (a, c) => {
      return { price: a.price + c.price * c.counter, counter: 1 };
    },
    { price: 0, counter: 1 }
  );
  ```

  - 총 개수와 금액을 관리하는 전역 데이터 slice를 생성해 dispatch 합니다.

  ```typescript
  //store > TotalSlice.tsx

  export const totalSlice = createSlice({
    name: "total",
    initialState,
    reducers: {
      TotalCounter: (state, action: PayloadAction<{ counter: number }>) => {
        const { counter } = action.payload;
        state.totalCouter = counter;
      },
      TotalPrice: (state, action: PayloadAction<{ price: number }>) => {
        const { price } = action.payload;
        state.totalPrice = price;
      },
    },
  });
  ```

  ```typescript
  //components > OrderSheet.tsx

  useEffect(() => {
    dispatch(TotalCounter({ counter: totalCouter.counter }));
    dispatch(TotalPrice({ price: totalPrice.price }));
  }, [totalCouter, totalPrice]);
  ```

  <br/>

- 주문 아이템의 합계 수량이 0일 때는 주문할 수 없습니다.

  - 버튼 클릭 시 총 개수가 0개면 alert 창이 나타나고, 아니라면 통신 함수가 실행됩니다.

  ```typescript
  //components > OrderSheet.tsx

  <Button
    id="submit"
    onClick={() =>
      total.totalCouter !== 0
        ? handleSubmit(total)
        : alert("상품 수량이 0입니다.")
    }
  />
  ```

  <br/>

#### _조건 4.수량이 1 이상인 아이템의 배경색을 바꿔 주세요._

- for문으로 순회되는 각 아이템들 중 프로퍼티 counter가 0개 이상인 아이템은 red 클라스네임을 적용합니다.
- style에서 .red 요소는 배경 색을 변경합니다.

```typescript
//components > Items.tsx

    <li key={elem.id} className={elem.counter !== 0 ? "red" : ""}>
```

```typescript
// style > compenents > ItemsCSS.ts

export const ItemsCSS = styled.ul`
  //...생략

  &.red {
    background: rgba(247, 90, 47, 0.1);
  }
`;
```

  <br/>

#### _조건 5.주문하기 클릭 후 로딩 중인 상태를 하단 버튼에 표시해 주세요._

- 버튼 클릭 시 useMutation으로 post 요청을 보내며, isLoading을 반환받아 버튼의 children과 bg color를 달리 적용합니다.

```typescript
//components > Items.tsx
import FetchOrder from "../apis/FetchOrder";

const { handleSubmit, isLoading } = FetchOrder();

<Button
  children={isLoading ? "로딩 중..." : "주문하기"}
  id="submit"
  className={isLoading ? "gray" : ""}
  onClick={() =>
    total.totalCouter !== 0
      ? handleSubmit(total)
      : alert("상품 수량이 0입니다.")
  }
/>;
```

- 통신 함수는 total 데이터를 파라미터로 받습니다.
- axios를 이용하여 post 메서드로 데이터를 담아 서버에 요청을 보냅니다.
- server의 엔드포인트는 환경변수로 관리합니다.
- async await 문법으로 비동기 요청을 처리합니다.
- try{}catch{} 문으로 예외 처리를 시행합니다.
- useMutation의 쿼리 함수로 작성한 통신 함수를 전달합니다.

```typescript
// apis > FetchOrder.tsx

function FetchOrder() {
  const fetchOrder = async (data: TotalDataType) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/ordersheet`,
        data
      );
      return res;
    } catch (error) {
      throw error;
    }
  };

  const { mutate, isSuccess, isError, isLoading } = useMutation(fetchOrder);

  const handleSubmit = async (total: TotalDataType) => {
    try {
      await mutate(total);
      console.log("주문하기 통신 성공!");
    } catch (error) {
      console.log("주문하기 통신 실패", error);
    }
  };

  return { handleSubmit, isLoading };
}
```

  <br/>

#### _조건 6.주문이 성공하면 /complete로 이동하며 3초 뒤에 /order 페이지로 돌아옵니다._

- useMutation에서 isSuccess, isError 통신 결과를 반환받습니다.
- 통신 성공 시 useNavigate 훅으로 페이지를 이동합니다.
- Complete 페이지가 렌더링 되면 timeout으로 3000ms 뒤 /order 페이지로 이동합니다.

```typescript
// apis > FetchOrder.tsx

const { mutateAsync, isSuccess, isError, isLoading } = useMutation(fetchOrder);

useEffect(() => {
  if (isSuccess) {
    navigate("/complate");
  }

  if (isError) {
    navigate("/error");
  }
}, [isSuccess, isError, isLoading]);
```

```typescript
//pages > Complete.tsx
useEffect(() => {
  const timeout = setTimeout(() => {
    navigate("/order");
  }, 3000);

  return () => clearTimeout(timeout);
}, []);
```
