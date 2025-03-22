import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";

const MainPage = () => {
    const { products, loading, filterLoading, filterError, error } = useSelector((state: RootState) => state.products);

    if (loading === 'pending' || filterLoading === 'pending') {
        return <div>Yükleniyor...</div>;
    }

    if (error || filterError) {
        return <div>Hata: {error}</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Ürünler</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default MainPage