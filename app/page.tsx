import Navbar from '@/components/navbar/Navbar';
import ItemsTable from '@/components/items/ItemsTable';

export default function Home() {
    return (
        <main className="min-h-screen w-5/6 mx-auto">
            <Navbar />
            <ItemsTable />
        </main>
    );
}
