{pkgs, ...}: {
  # https://devenv.sh/packages/
  packages = with pkgs;
    [
      git
      just
      onefetch
      typescript
    ]
    ++ (
      with pkgs.nodePackages; [
        vercel
      ]
    );

  languages.javascript = {
    enable = true;

    # npm but better?? idk it's what the nextjs tutorial says to use
    pnpm = {
      enable = true;
      install.enable = true;
    };
  };

  enterShell = ''
    onefetch
  '';

  pre-commit.hooks = {
    # Nix
    alejandra.enable = true;
    flake-checker.enable = true;
    deadnix.enable = true;

    # HTML, CSS, JS, TS, etc.
    prettier.enable = true;
  };
}
