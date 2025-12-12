export default function FilterPricesForm({ handleFilterPrices }) { //filterPricesForm from Extra Module 1 - Filtering, just changed slightly
  return (
    <div>
      <h2>Filter Price</h2>
      <form action="">
        <input
          type="radio"
          name="priceFilter"
          id="all"
          value="all"
          onChange={handleFilterPrices}
          defaultChecked
        />
        <label htmlFor="all">All Prices</label>
        <br />
        <input
          type="radio"
          name="priceFilter"
          id="1"
          value={1}
          onChange={handleFilterPrices}
        />
        <label htmlFor="1">{"< $1.00"}</label>
        <br />
        <input
          type="radio"
          name="priceFilter"
          id="2"
          value={2}
          onChange={handleFilterPrices}
        />
        <label htmlFor="2">{"< $2.00"}</label>
        <br />
        <input
          type="radio"
          name="priceFilter"
          id="4"
          value={4}
          onChange={handleFilterPrices}
        />
        <label htmlFor="4">{"< $4.00"}</label>
        <br />
        <input
          type="radio"
          name="priceFilter"
          id="6"
          value={6}
          onChange={handleFilterPrices}
        />
        <label htmlFor="6">{"< $6.00"}</label>
        <br />
        <input
          type="radio"
          name="priceFilter"
          id="9"
          value={9}
          onChange={handleFilterPrices}
        />
        <label htmlFor="9">{"< $9.00"}</label>
      </form>
    </div>
  );
}