import { useContext } from "react"
import { LoadingContext } from "../context/loading"

export default () => {
    const { hideLoading, isLoading, showLoading } = useContext(LoadingContext);

    const action = <T, R>(callback: (props: T) => Promise<R>) => {
      return async (props: T): Promise<R> => {
        try {
          showLoading();
          const data = await callback(props);
          return data;
        } catch (err) {
          throw err;
        } finally {
          hideLoading();
        }
      };
    };

    return { action, hideLoading, isLoading, showLoading };
}