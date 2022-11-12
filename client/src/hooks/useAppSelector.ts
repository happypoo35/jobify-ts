import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { RootState } from "@/features/rootReducer";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
