'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Document } from '@tiptap/extension-document';
import { Text } from '@tiptap/extension-text';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Bold } from '@tiptap/extension-bold';
import { Italic } from '@tiptap/extension-italic';
import { Underline } from '@tiptap/extension-underline';
import { Strike } from '@tiptap/extension-strike';
import { Code } from '@tiptap/extension-code';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { ListItem } from '@tiptap/extension-list-item';
import { Blockquote } from '@tiptap/extension-blockquote';
import { Heading } from '@tiptap/extension-heading';
import { Link } from '@tiptap/extension-link';
import { History } from '@tiptap/extension-history';
import { useEffect } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ content, onChange, placeholder = "Start typing...", className }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Document,
      Text,
      Paragraph,
      Bold,
      Italic,
      Underline,
      Strike,
      Code,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      Link.configure({ openOnClick: false }),
      History,
      Placeholder.configure({
        placeholder,
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none p-6 min-h-[300px] text-foreground',
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className={`border border-input rounded-md bg-card focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${className}`}>
      {/* Toolbar */}
      <div className="border-b border-border p-2 flex gap-1 flex-wrap bg-card">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded text-sm hover:bg-muted ${editor.isActive('bold') ? 'bg-muted' : ''}`}
          type="button"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded text-sm hover:bg-muted ${editor.isActive('italic') ? 'bg-muted' : ''}`}
          type="button"
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded text-sm hover:bg-muted ${editor.isActive('underline') ? 'bg-muted' : ''}`}
          type="button"
        >
          <span className="underline">U</span>
        </button>
        <div className="w-px bg-border mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded text-sm hover:bg-muted ${editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}`}
          type="button"
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded text-sm hover:bg-muted ${editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}`}
          type="button"
        >
          H2
        </button>
        <div className="w-px bg-border mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded text-sm hover:bg-muted ${editor.isActive('bulletList') ? 'bg-muted' : ''}`}
          type="button"
        >
          •
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded text-sm hover:bg-muted ${editor.isActive('orderedList') ? 'bg-muted' : ''}`}
          type="button"
        >
          1.
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded text-sm hover:bg-muted ${editor.isActive('blockquote') ? 'bg-muted' : ''}`}
          type="button"
        >
          "
        </button>
      </div>
      
      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}