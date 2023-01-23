//exporta os nomes das navegações para poder acessar sem ocorrer erro no código que chama a rota
export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      newhabit: undefined;
      habit: {
        date: string;
      };
    }
  }
}
