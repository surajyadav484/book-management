import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Filter from "../Filter";
import Sort from "../Sort";

const FilterDrawer = () => {
  return (
    <Sheet className="lg:hidden">
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader></SheetHeader>
        <div>
          <div className="mb-8">
            <Sort />
          </div>

          <Filter />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterDrawer;
