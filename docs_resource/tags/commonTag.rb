# Custom tags for JSDuck 5.x
# See also:
# - https://github.com/senchalabs/jsduck/wiki/Tags
# - https://github.com/senchalabs/jsduck/wiki/Custom-tags
# - https://github.com/senchalabs/jsduck/wiki/Custom-tags/7f5c32e568eab9edc8e3365e935bcb836cb11f1d
require 'jsduck/tag/tag'

class CommonTag < JsDuck::Tag::Tag
  def initialize
    @html_position = POS_DOC + 0.1
    @repeatable = true
  end

  def parse_doc(scanner, _position)
    if @multiline
      return { tagname: @tagname, doc: :multiline }
    else
      text = scanner.match(/.*$/)
      return { tagname: @tagname, doc: text }
    end
  end

  def process_doc(context, tags, _position)
    context[@tagname] = tags
  end

  def format(context, formatter)
    context[@tagname].each do |tag|
      tag[:doc] = formatter.format(tag[:doc])
    end
  end
end

class SourceTag < CommonTag
  def initialize
    @tagname = :source
    @pattern = "source"
    super
  end

  def to_html(context)
    context[@tagname].map do |source|
      <<-EOHTML
        <h3 class='pa'>Source</h3>
        #{source[:doc]}
      EOHTML
    end.join
  end
end

class UntilTag < CommonTag
  def initialize
    @tagname = :until
    @pattern = "until"
    super
  end

  def to_html(context)
    <<-EOHTML
      <h3>Until</h3>
      <div class="signature-box"><p>
      This method provides <strong>browser compatibility</strong> for:
      #{ context[@tagname].map { |tag| tag[:doc] }.join("\n") }
      </p></div>
    EOHTML
  end
end

class SeeTag < CommonTag
  def initialize
    @tagname = :see
    @pattern = "see"
    super
  end

  def format(context, formatter)
    position = context[:files][0]
    context[@tagname].each do |tag|
      tag[:doc] = '<li>' + render_long_see(tag[:doc], formatter, position) + '</li>'
    end
  end

  def to_html(context)
    <<-EOHTML
      <p><b>See Also</b></p>
      <ul>
      #{ context[@tagname].map { |tag| tag[:doc] }.join("\n") }
      </ul>
    EOHTML
  end

  def render_long_see(tag, formatter, position)
    match = tag.match(/\A([^\s]+)( .*)?\Z/m)
    if tag.include? 'http'
      return  "<a href='"+tag+"'>"+tag+"</a>"
    end
    if match
      name = match[1]
      doc = match[2] ? ': ' + match[2] : ''
      return formatter.format("LOL {@link #{name}} #{doc}")
    else
      JsDuck::Logger.warn(nil, 'Unexpected @see argument: "' + tag + '"', position)
      return tag
    end
  end
end

class ContextTag < CommonTag
  def initialize
    @tagname = :this
    @pattern = 'this'
    super
  end

  def format(context, formatter)
    position = context[:files][0]
    context[@tagname].each do |tag|
      tag[:doc] = render_long_context(tag[:doc], formatter, position)
    end
  end

  def to_html(context)
    <<-EOHTML
      <h3 class="pa">Context</h3>
      #{ context[@tagname].last[:doc] }
    EOHTML
  end

  def render_long_context(tag, formatter, position)
    match = tag.match(/\A([^\s]+)/m)
    if match
      name = match[1]
      return formatter.format("`this` : {@link #{name}}")
    else
      JsDuck::Logger.warn(nil, 'Unexpected @this argument: "' + tag + '"', position)
      return tag
    end
  end
end

class TodoTag < CommonTag
  def initialize
    @tagname = :todo
    @pattern = "todo"
    super
  end

  def to_html(context)
    <<-EOHTML
      <h3>TODO</h3>
      #{ context[@tagname].last[:doc] }
    EOHTML
  end
end