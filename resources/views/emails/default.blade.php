@foreach($data as $key => $value)
    <b>{{$words[$key]}}: </b>
    @if(is_array($value))
        <ol>
        @foreach($value as $li => $list_value)
            @if(is_array($list_value))
                <li>
                    <ul>
                    @foreach($list_value as $i => $nested_value)
                        <li><b>{{$words[sprintf('%s[%s]', $key, $i)]}}: </b>{{$nested_value}}</li>
                    @endforeach
                    </ul>
                    <br/>
                </li>
            @else
                <li>{{$list_value}}</li>
            @endif
        @endforeach
        </ol>
    @else
        {{$value}}
    @endif
    <br/>
@endforeach