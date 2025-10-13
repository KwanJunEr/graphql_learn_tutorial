<p>
Tutorial Docs: https://docs.google.com/document/d/1p-XKWWrN3Eyz0aVwlyN44jXuRlNS3CwWs_eanr88tiw/edit?tab=t.0
<br>
Website to Test: https://studio.apollographql.com/sandbox/explorer/
<br>
<pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow-x: auto;">
<code style="font-family: Consolas, monospace; color: #d6336c;">
npm init --yes && npm pkg set type="module"
</code>
</pre>
This line of code helps to initialie a new Node.js project in the current folder,creating a package.json file automatically  and the npm pkg set type="module" tells the Node.js that your project uses ES Modules (ESM) instead of Common JS
<br>
<pre>
<code>
npm install @apollo/server graphql
</code>
</pre>
</p>