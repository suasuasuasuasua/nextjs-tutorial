{pkgs, ...}: {
  # https://devenv.sh/packages/
  packages = with pkgs; [
    git
    gnupg

    just
    onefetch

    commitizen

    typescript
    markdownlint-cli
  ];

  languages.javascript = {
    enable = true;

    # npm but better?? idk it's what the nextjs tutorial says to use
    pnpm = {
      enable = true;
      install.enable = true;
    };
  };

  # enterShell = ''
  #   onefetch
  # '';

  pre-commit.hooks = {
    # Nix
    alejandra.enable = true;
    deadnix.enable = true;

    # Git
    commitizen.enable = true;

    # Docs
    markdownlint.enable = true;
    typos.enable = true;

    # General
    check-added-large-files.enable = true;
    check-merge-conflicts.enable = true;
    end-of-file-fixer.enable = true;
    trim-trailing-whitespace.enable = true;

    # HTML, CSS, JS, TS, etc.
    prettier.enable = true;
    eslint = {
      enable = true;
      always_run = true;
      args = [
        "--fix"
        "app/"
      ];
    };
  };
}
