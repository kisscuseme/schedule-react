import { MutationFunction, useMutation } from "@tanstack/react-query";

const doMutaion = <TData = unknown, TVariables = void>(
    mutationFunction: MutationFunction<TData, TVariables>,
    successCallback: (data: unknown) => void,
    errorCallback?: (data: unknown) => void) => {
  return useMutation(mutationFunction, {
    onMutate: variable => {
      // console.log("onMutate", variable);
    },
    onError: (error, variable, context) => {
      // error
      if(errorCallback) errorCallback(error);
    },
    onSuccess: (data, variables, context) => {
        successCallback(data);
    },
    onSettled: () => {
      // console.log("end");
    }
  });
}

export { doMutaion }