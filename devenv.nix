{ pkgs, lib, config, inputs, ... }:
{
  # https://devenv.sh/basics/
  env.GREET = "devenv";

  # https://devenv.sh/packages/
  packages = with pkgs; [ 
    git 
  ];

  languages.javascript = {
    enable = true;

    # npm but better?? idk it's what the nextjs tutorial says to use
    pnpm = {
      enable = true;
    };
  };
}
