import { useContext } from "react"
import { LoadingContext } from "../context/loading"
type AsyncFunction<T extends any[], R> = (...args: T) => Promise<R>;

export default () => {
    const { hideLoading, isLoading, showLoading } = useContext(LoadingContext);

    const action = <T extends any[], R>(
      callback: AsyncFunction<T, R>
    ): ((...args: T) => Promise<R>) => {
      return async (...args: T) => {
        showLoading();
        return callback(...args)
          .then((res) => res)
          .catch((err) => err)
          .finally(() => hideLoading());
      };
    };

    return { action, hideLoading, isLoading, showLoading };
}