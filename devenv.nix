{pkgs, ...}: {
  dotenv.disableHint = true;

  packages = with pkgs; [
    vscode-langservers-extracted
    nodePackages.typescript-language-server
  ];
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_20;
  };

  # See full reference at https://devenv.sh/reference/options/
}
