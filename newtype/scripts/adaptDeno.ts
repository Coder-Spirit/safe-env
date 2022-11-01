import { join } from 'path'
import { processDirectory } from './lib/processFiles'

run()
  .then(() => {
    // Do nothing
  })
  .catch((e) => {
    console.log('Unknown Error', e)
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  })

async function run(): Promise<void> {
  const esmDir = join(__dirname, '..', 'deno')
  await processDirectory(
    esmDir,
    '.ts',
    [['@coderspirit/nominal', 'https://deno.land/x/nominal@3.2.1/nominal/deno/index.ts']]
  )
}
