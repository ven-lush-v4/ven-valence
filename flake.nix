
{
  description = "devshell";

  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

  outputs =
    { nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};

      # put whatever tools you want here
      tools = with pkgs; [
        bun
        typescript
        typescript-language-server
        vscode-langservers-extracted
        pnpm
        biome
      ];
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages = tools;

        shellHook = ''
          echo "devshell: ${pkgs.lib.concatStringsSep ", " (map (p: p.name) tools)}" >&2
        '';
      };
    };
}
