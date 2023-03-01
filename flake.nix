{
  description = "base for typescript coding";
  inputs.nixpkgs.url = "github:nixos/nixpkgs/release-22.11";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem
      (system:
        let pkgs = nixpkgs.legacyPackages.${system}; in
        {
          devShells.default = pkgs.mkShell {
            buildInputs = [
              pkgs.nodePackages.typescript-language-server
              pkgs.yarn # let's only keep yarn in root. to do yarn create vite
              # pkgs.nodePackages.tailwindcss
              # pkgs.typescript
              pkgs.nodejs
              # pkgs.nodePackages_latest.ts-node
              pkgs.nodePackages.prettier
              # pkgs.nodePackages.autoprefixer
              # pkgs.nodePackages.postcss
            ];
            shellHook = ''
              export SOME_SHELL_VAR=ITS_VALUE
              echo "hello from life expectancy"
            '';
          };
        }
      );
  # https://tailwindcss.com/docs/guides/vite
  #
  # see https://serokell.io/blog/practical-nix-flakes
}
