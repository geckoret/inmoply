#!/bin/sh
mkdir -p .bunx-shim
echo "#!/bin/sh" > .bunx-shim/bunx
echo "bun x \"\$@\"" >> .bunx-shim/bunx
chmod +x .bunx-shim/bunx
export PATH="$PWD/.bunx-shim:$PATH"
exec "$@"
